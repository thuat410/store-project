import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { createKeyv } from '@keyv/redis';
import { RedisCacheService } from './redis-cache.service';

@Global() // Make it global so you don't need to import RedisCacheModule everywhere
@Module({
    imports: [
        CacheModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const redisUrl = configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
                const redisPassword = configService.get<string>('REDIS_PASSWORD');

                return {
                    // Using createKeyv as per official NestJS documentation
                    store: createKeyv({ url: redisUrl, password: redisPassword }),
                    // ttl (time to live) is in milliseconds for cache-manager v5
                    ttl: 600000, // 10 minutes = 10 * 60 * 1000 ms
                };
            },
        }),
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService],
})
export class RedisCacheModule { }
