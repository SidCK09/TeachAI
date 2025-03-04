"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLazyServiceFactoryRef = void 0;
const react_1 = require("react");
function useLazyServiceFactoryRef(serviceFactory, storage, update) {
    const ref = (0, react_1.useRef)();
    if (typeof ref.current === "undefined") {
        ref.current = serviceFactory(storage, update);
    }
    return ref;
}
exports.useLazyServiceFactoryRef = useLazyServiceFactoryRef;
//# sourceMappingURL=useLazyServiceFactoryRef.js.map