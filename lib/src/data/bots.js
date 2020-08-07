"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("./models/bot");
var db_wrapper_1 = __importDefault(require("./db-wrapper"));
var command_utils_1 = require("../utils/command-utils");
var Bots = /** @class */ (function (_super) {
    __extends(Bots, _super);
    function Bots() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bots.prototype.getOrCreate = function (id) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var savedBot, _b, votedForThisWeek;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!id || id === 'user')
                            return [2 /*return*/, null];
                        return [4 /*yield*/, bot_1.SavedBot.findById(id)];
                    case 1:
                        if (!((_a = _c.sent()) !== null && _a !== void 0)) return [3 /*break*/, 2];
                        _b = _a;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.create(id)];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        savedBot = _b;
                        votedForThisWeek = savedBot.lastVoteAt
                            && command_utils_1.getWeek(savedBot.lastVoteAt) === command_utils_1.getWeek(new Date());
                        if (!votedForThisWeek)
                            savedBot.votes = [];
                        return [2 /*return*/, savedBot];
                }
            });
        });
    };
    Bots.prototype.create = function (id) {
        return new bot_1.SavedBot({ _id: id }).save();
    };
    Bots.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bot_1.SavedBot.findByIdAndDelete(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Bots.prototype.exists = function (id) {
        return bot_1.SavedBot.exists({ _id: id });
    };
    Bots.prototype.getManageable = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, bot_1.SavedBot.find({ ownerId: id })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Bots.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bot_1.SavedBot.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Bots;
}(db_wrapper_1.default));
exports.default = Bots;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL2JvdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQXFEO0FBQ3JELDREQUFxQztBQUNyQyx3REFBaUQ7QUFFakQ7SUFBa0Msd0JBQThCO0lBQWhFOztJQWtDQSxDQUFDO0lBakNtQiwwQkFBVyxHQUEzQixVQUE0QixFQUFVOzs7Ozs7O3dCQUNsQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxNQUFNOzRCQUFFLHNCQUFPLElBQUksRUFBQzt3QkFFckIscUJBQU0sY0FBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBQTs7b0NBQTNCLFNBQTJCOzs7NEJBQ3JDLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUE7O3dCQUFyQixLQUFBLFNBQXFCLENBQUE7Ozt3QkFEdEIsUUFBUSxLQUNjO3dCQUV0QixnQkFBZ0IsR0FBRyxRQUFRLENBQUMsVUFBVTsrQkFDckMsdUJBQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssdUJBQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7d0JBQzVELElBQUksQ0FBQyxnQkFBZ0I7NEJBQ2pCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO3dCQUV4QixzQkFBTyxRQUFRLEVBQUM7Ozs7S0FDbkI7SUFFUyxxQkFBTSxHQUFoQixVQUFpQixFQUFVO1FBQ3ZCLE9BQU8sSUFBSSxjQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUsscUJBQU0sR0FBWixVQUFhLEVBQVU7Ozs7NEJBQ1oscUJBQU0sY0FBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxFQUFBOzRCQUEzQyxzQkFBTyxTQUFvQyxFQUFDOzs7O0tBQy9DO0lBRUQscUJBQU0sR0FBTixVQUFPLEVBQVU7UUFDYixPQUFPLGNBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUssNEJBQWEsR0FBbkIsVUFBb0IsRUFBc0I7WUFBcEIsVUFBRTs7Ozs0QkFDYixxQkFBTSxjQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUE7NEJBQTNDLHNCQUFPLFNBQW9DLEVBQUM7Ozs7S0FDL0M7SUFFSyxxQkFBTSxHQUFaOzs7OzRCQUNXLHFCQUFNLGNBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQTs0QkFBNUIsc0JBQU8sU0FBcUIsRUFBQzs7OztLQUNoQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBbENELENBQWtDLG9CQUFTLEdBa0MxQyJ9