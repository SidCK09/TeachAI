import type { MutableRefObject } from "react";
import type { ChatServiceFactory, UpdateState } from "../Types";
import type { IChatService, IStorage } from "../interfaces";
export declare function useLazyServiceFactoryRef<S extends IChatService>(serviceFactory: ChatServiceFactory<S>, storage: IStorage, update: UpdateState): MutableRefObject<S>;
