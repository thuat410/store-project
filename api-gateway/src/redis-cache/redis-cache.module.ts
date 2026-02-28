import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { RedisCacheService } from './redis-cache.service';

@Global() // Make it global so you don't need to import RedisCacheModule everywhere
@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: () => {
                return {
                    // Using @keyv/redis as the underlying store for cache-manager
                    store: new KeyvRedis('redis://localhost:6379'),
                    // ttl (time to live) is in milliseconds for cache-manager v5
                };
            },
        }),
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService],
})
export class RedisCacheModule { }
