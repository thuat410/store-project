import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { VoucherConfigService } from './voucher-config.service';
import { VoucherConfigController } from './voucher-config.controller';

@Module({
    controllers: [VoucherController, VoucherConfigController],
    providers: [VoucherConfigService, VoucherService],
})
export class VoucherModule { }
