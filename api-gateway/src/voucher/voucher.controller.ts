import { Controller, Post, Body, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { VoucherService } from './voucher.service';

class ClaimVoucherDto {
    userId: string;
}

@Controller('voucher')
export class VoucherController {
    constructor(private readonly voucherService: VoucherService) { }

    /**
     * POST /voucher/claim
     * Body: { "userId": "user-123" }
     */
    @Post('claim')
    @HttpCode(HttpStatus.OK)
    async claim(@Body() dto: ClaimVoucherDto) {
        if (!dto.userId) {
            throw new BadRequestException('userId is required');
        }

        const result = await this.voucherService.claimVoucher(dto.userId);

        if (!result.success) {
            const message =
                result.reason === 'already_claimed'
                    ? 'You have already claimed a voucher.'
                    : 'All vouchers have been claimed.';
            return { success: false, message };
        }

        return {
            success: true,
            message: `Voucher claimed! You are #${result.position} of ${result.total}.`,
            position: result.position,
        };
    }
}
