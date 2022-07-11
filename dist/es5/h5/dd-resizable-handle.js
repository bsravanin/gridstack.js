"use strict";
/**
 * dd-resizable-handle.ts 5.1.1
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDResizableHandle = void 0;
var DDResizableHandle = /** @class */ (function () {
    function DDResizableHandle(host, direction, option) {
        /** @internal true after we've moved enough pixels to start a resize */
        this.moving = false;
        this.host = host;
        this.dir = direction;
        this.option = option;
        // create var event binding so we can easily remove and still look like TS methods (unlike anonymous functions)
        this._mouseDown = this._mouseDown.bind(this);
        this._mouseMove = this._mouseMove.bind(this);
        this._mouseUp = this._mouseUp.bind(this);
        this._init();
    }
    /** @internal */
    DDResizableHandle.prototype._init = function () {
        var el = document.createElement('div');
        el.classList.add('ui-resizable-handle');
        el.classList.add("" + DDResizableHandle.prefix + this.dir);
        el.style.zIndex = '100';
        el.style.userSelect = 'none';
        this.el = el;
        this.host.appendChild(this.el);
        this.el.addEventListener('mousedown', this._mouseDown);
        return this;
    };
    /** call this when resize handle needs to be removed and cleaned up */
    DDResizableHandle.prototype.destroy = function () {
        if (this.moving)
            this._mouseUp(this.mouseDownEvent);
        this.el.removeEventListener('mousedown', this._mouseDown);
        this.host.removeChild(this.el);
        delete this.el;
        delete this.host;
        return this;
    };
    /** @internal called on mouse down on us: capture move on the entire document (mouse might not stay on us) until we release the mouse */
    DDResizableHandle.prototype._mouseDown = function (e) {
        e.preventDefault();
        this.mouseDownEvent = e;
        document.addEventListener('mousemove', this._mouseMove, true); // capture, not bubble
        document.addEventListener('mouseup', this._mouseUp);
    };
    /** @internal */
    DDResizableHandle.prototype._mouseMove = function (e) {
        var s = this.mouseDownEvent;
        // don't start unless we've moved at least 3 pixels
        if (!this.moving && Math.abs(e.x - s.x) + Math.abs(e.y - s.y) > 2) {
            this.moving = true;
            this._triggerEvent('start', this.mouseDownEvent);
        }
        else if (this.moving) {
            this._triggerEvent('move', e);
        }
    };
    /** @internal */
    DDResizableHandle.prototype._mouseUp = function (e) {
        if (this.moving) {
            this._triggerEvent('stop', e);
        }
        document.removeEventListener('mousemove', this._mouseMove, true);
        document.removeEventListener('mouseup', this._mouseUp);
        delete this.moving;
        delete this.mouseDownEvent;
    };
    /** @internal */
    DDResizableHandle.prototype._triggerEvent = function (name, event) {
        if (this.option[name])
            this.option[name](event);
        return this;
    };
    /** @internal */
    DDResizableHandle.prefix = 'ui-resizable-';
    return DDResizableHandle;
}());
exports.DDResizableHandle = DDResizableHandle;
//# sourceMappingURL=dd-resizable-handle.js.map