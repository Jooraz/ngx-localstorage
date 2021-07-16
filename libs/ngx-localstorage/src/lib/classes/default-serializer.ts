import { StorageSerializer } from '../interfaces/storage-serializer';
import { Injectable } from "@angular/core";

/**
 * Provides a default serialization mechanism while
 */
@Injectable()
export class DefaultSerializer implements StorageSerializer {
    /**
     * @inheritdoc
     */
    public serialize(value: unknown): string {
        return JSON.stringify(value);
    }

    /**
     * @inheritdoc
     */
    public deserialize(storedValue: string): unknown {
        return JSON.parse(storedValue);
    }
}