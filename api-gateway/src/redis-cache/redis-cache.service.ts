import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }

    /**
     * Lấy dữ liệu từ Cache theo Key
     */
    async get<T>(key: string): Promise<T | undefined> {
        return this.cacheManager.get<T>(key);
    }

    /**
     * Lưu dữ liệu vào Cache
     * @param ttl Thời gian sống của cache (milliseconds trong cache-manager v5)
     */
    async set(key: string, value: any, ttl?: number): Promise<void> {
        await this.cacheManager.set(key, value, ttl);
    }

    /**
     * Xóa dữ liệu cache theo Key
     */
    async del(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }
}
