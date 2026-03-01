import {
    Controller,
    Post,
    Get,
    Body,
    HttpCode,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common';
import { VoucherConfigService } from './voucher-config.service';

class SetLimitDto {
    limit: number;
}

@Controller('voucher/config')
export class VoucherConfigController {
    constructor(private readonly voucherConfigService: VoucherConfigService) { }

    /**
     * POST /voucher/config/limit
     * Body: { "limit": 100 }
     * Persists the new voucher limit to Redis.
     */
    @Post('limit')
    @HttpCode(HttpStatus.OK)
    async setLimit(@Body() dto: SetLimitDto) {
        const limit = Number(dto.limit);
        if (!Number.isInteger(limit) || limit < 1) {
            throw new BadRequestException('limit must be a positive integer');
        }

        await this.voucherConfigService.setLimit(limit);
        return { success: true, message: `Voucher limit updated to ${limit}.`, limit };
    }

    /**
     * GET /voucher/config/status
     * Returns current limit, claimed count, and remaining vouchers.
     */
    @Get('status')
    async getStatus() {
        const status = await this.voucherConfigService.getStatus();
        return { success: true, ...status };
    }
}
