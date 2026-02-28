import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NatsService {
    constructor(
        @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    ) { }

    /**
     * Cấu hình hàm publish chỉ nhận vào 2 tham số: subject và data.
     * Đây là dạng pub/sub (phát thông báo mà không cần chờ phản hồi).
     */
    publish(subject: string, data: any) {
        return this.natsClient.emit(subject, data);
    }

    /**
     * Hàm này dùng cho Request-Reply pattern.
     * Gửi message đi và đợi Service khác trả về dữ liệu.
     */
    async send<TResult = any>(subject: string, data: any): Promise<TResult> {
        return lastValueFrom(this.natsClient.send<TResult>(subject, data));
    }
}
