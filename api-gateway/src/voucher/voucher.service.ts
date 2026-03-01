import { Injectable } from '@nestjs/common';
import {
    VoucherConfigService,
    VOUCHER_COUNTER_KEY,
    VOUCHER_USER_KEY_PREFIX,
} from './voucher-config.service';

/**
 * Lua script — runs atomically in Redis.
 *
 * KEYS[1] = voucher counter key       (voucher:counter)
 * KEYS[2] = per-user claimed key      (voucher:claimed:<userId>)
 * ARGV[1] = voucher limit             (dynamic, from VoucherConfigService)
 *
 * Returns:
 *   -2  → user already claimed
 *   -1  → vouchers exhausted
 *   1-N → position claimed (1 = first)
 */
const CLAIM_VOUCHER_SCRIPT = `
local userKey    = KEYS[2]
local counterKey = KEYS[1]
local limit      = tonumber(ARGV[1])

if redis.call('EXISTS', userKey) == 1 then
  return -2
end

local current = tonumber(redis.call('GET', counterKey) or '0')
if current >= limit then
  return -1
end

local position = redis.call('INCR', counterKey)
redis.call('SET', userKey, '1')
return position
`;

@Injectable()
export class VoucherService {
    constructor(private readonly voucherConfigService: VoucherConfigService) { }

    async claimVoucher(userId: string): Promise<ClaimResult> {
        const limit = await this.voucherConfigService.getLimit();
        const userKey = `${VOUCHER_USER_KEY_PREFIX}:${userId}`;

        const result = (await this.voucherConfigService.redis.eval(CLAIM_VOUCHER_SCRIPT, {
            keys: [VOUCHER_COUNTER_KEY, userKey],
            arguments: [String(limit)],
        })) as number;

        if (result === -2) {
            return { success: false, reason: 'already_claimed' };
        }
        if (result === -1) {
            return { success: false, reason: 'exhausted' };
        }
        return { success: true, position: result, total: limit };
    }
}

export interface ClaimResult {
    success: boolean;
    reason?: 'already_claimed' | 'exhausted';
    position?: number;
    total?: number;
}
