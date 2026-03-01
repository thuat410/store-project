import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from '@redis/client';

export const VOUCHER_COUNTER_KEY = 'voucher:counter';
export const VOUCHER_CONFIG_LIMIT_KEY = 'voucher:config:limit';
export const VOUCHER_USER_KEY_PREFIX = 'voucher:claimed';

const DEFAULT_LIMIT = 50;

@Injectable()
export class VoucherConfigService implements OnModuleInit, OnModuleDestroy {
    redis: RedisClientType;

    constructor(private readonly configService: ConfigService) { }

    async onModuleInit() {
        const url = this.configService.get<string>('REDIS_URL') ?? 'redis://localhost:6379';
        this.redis = createClient({ url }) as RedisClientType;
        await this.redis.connect();
    }

    async onModuleDestroy() {
        await this.redis.close();
    }

    /**
     * Persist the voucher limit to Redis so it survives across requests
     * and can be updated at runtime without redeployment.
     */
    async setLimit(limit: number): Promise<void> {
        await this.redis.set(VOUCHER_CONFIG_LIMIT_KEY, String(limit));
    }

    /**
     * Read the limit from Redis.
     * Falls back to env var VOUCHER_LIMIT, then to 50.
     */
    async getLimit(): Promise<number> {
        const raw = await this.redis.get(VOUCHER_CONFIG_LIMIT_KEY);
        if (raw !== null) return Number(raw);

        const envLimit = this.configService.get<number>('VOUCHER_LIMIT');
        return envLimit ?? DEFAULT_LIMIT;
    }

    /**
     * Return current limit and how many vouchers have been claimed.
     */
    async getStatus(): Promise<{ limit: number; claimed: number; remaining: number }> {
        const [limitRaw, claimedRaw] = await Promise.all([
            this.redis.get(VOUCHER_CONFIG_LIMIT_KEY),
            this.redis.get(VOUCHER_COUNTER_KEY),
        ]);

        const envLimit = this.configService.get<number>('VOUCHER_LIMIT');
        const limit = limitRaw !== null ? Number(limitRaw) : (envLimit ?? DEFAULT_LIMIT);
        const claimed = claimedRaw !== null ? Number(claimedRaw) : 0;

        return { limit, claimed, remaining: Math.max(0, limit - claimed) };
    }
}
