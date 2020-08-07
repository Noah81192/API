"use strict";
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
var express_1 = require("express");
var bot_1 = require("../../../bot");
var user_routes_1 = require("../user-routes");
var deps_1 = __importDefault(require("../../../utils/deps"));
var bots_1 = __importDefault(require("../../../data/bots"));
var users_1 = __importDefault(require("../../../data/users"));
var manage_bot_routes_1 = require("./manage-bot-routes");
var api_utils_1 = require("../../modules/api-utils");
exports.router = express_1.Router({ mergeParams: true });
var bots = deps_1.default.get(bots_1.default), users = deps_1.default.get(users_1.default);
exports.router.post('/review', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reviewer, savedReviewer, exists, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, user_routes_1.getUser(req.query.key)];
            case 1:
                reviewer = _a.sent();
                return [4 /*yield*/, users.get(reviewer)];
            case 2:
                savedReviewer = _a.sent();
                if (savedReviewer.role !== 'admin' &&
                    savedReviewer.role !== 'reviewer')
                    throw new TypeError('Insufficient permissions.');
                return [4 /*yield*/, bots.exists(req.params.id)];
            case 3:
                exists = _a.sent();
                if (!exists)
                    throw new TypeError('Bot does not exist.');
                return [4 /*yield*/, handleFeedback(req.params.id, {
                        approved: req.body.approved,
                        by: reviewer.id,
                        message: req.body.reason
                    })];
            case 4:
                _a.sent();
                res.json({ success: true });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                api_utils_1.sendError(res, 400, error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/add-badge/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reviewer, savedReviewer, exists, savedBot, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, user_routes_1.getUser(req.query.key)];
            case 1:
                reviewer = _a.sent();
                return [4 /*yield*/, users.get(reviewer)];
            case 2:
                savedReviewer = _a.sent();
                if (savedReviewer.role !== 'admin')
                    throw new TypeError('Insufficient permissions.');
                return [4 /*yield*/, bots.exists(req.params.id)];
            case 3:
                exists = _a.sent();
                if (!exists)
                    throw new TypeError('Bot does not exist.');
                return [4 /*yield*/, bots.get(req.params.id)];
            case 4:
                savedBot = _a.sent();
                savedBot.badges.push(req.params.name);
                return [4 /*yield*/, savedBot.save()];
            case 5:
                _a.sent();
                res.json({ success: true });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                api_utils_1.sendError(res, 400, error_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
function handleFeedback(id, feedback) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var savedBot, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, bots.get(id)];
                case 1:
                    savedBot = _c.sent();
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, ((_a = bot_1.bot.users.cache.get(savedBot.ownerId)) === null || _a === void 0 ? void 0 : _a.send("Your bot, <@!" + savedBot.id + ">, was " + (feedback.approved ? 'approved' : 'not approved') + " by <@!" + feedback.by + "> - `" + feedback.message + "`"))];
                case 3:
                    _c.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _b = _c.sent();
                    return [3 /*break*/, 5];
                case 5: return [4 /*yield*/, manage_bot_routes_1.sendLog("Bot " + (feedback.approved ? 'Approved' : 'Not Approved'), "<@!" + savedBot.ownerId + ">'s bot, <@!" + id + ">, was " + (feedback.approved ? 'approved' : 'not approved') + " by <@!" + feedback.by + "> - `" + feedback.message + "`", feedback.approved)];
                case 6:
                    _c.sent();
                    if (!feedback.approved)
                        return [2 /*return*/, savedBot.remove()];
                    savedBot.approvedAt = new Date();
                    savedBot.feedback.push(feedback);
                    return [4 /*yield*/, savedBot.save()];
                case 7:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2aWV3ZXItcm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS9yb3V0ZXMvYm90cy9yZXZpZXdlci1yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBaUM7QUFDakMsb0NBQW1DO0FBQ25DLDhDQUF5QztBQUV6Qyw2REFBdUM7QUFDdkMsNERBQXNDO0FBQ3RDLDhEQUF3QztBQUN4Qyx5REFBOEM7QUFDOUMscURBQW9EO0FBRXZDLFFBQUEsTUFBTSxHQUFHLGdCQUFNLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVwRCxJQUFNLElBQUksR0FBRyxjQUFJLENBQUMsR0FBRyxDQUFPLGNBQUksQ0FBQyxFQUMzQixLQUFLLEdBQUcsY0FBSSxDQUFDLEdBQUcsQ0FBUSxlQUFLLENBQUMsQ0FBQztBQUVyQyxjQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFPLEdBQUcsRUFBRSxHQUFHOzs7Ozs7Z0JBRWpCLHFCQUFNLHFCQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQTs7Z0JBQXZDLFFBQVEsR0FBRyxTQUE0QjtnQkFDdkIscUJBQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBQTs7Z0JBQXpDLGFBQWEsR0FBRyxTQUF5QjtnQkFDL0MsSUFBSSxhQUFhLENBQUMsSUFBSSxLQUFLLE9BQU87b0JBQ2hDLGFBQWEsQ0FBQyxJQUFJLEtBQUssVUFBVTtvQkFDakMsTUFBTSxJQUFJLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUVwQyxxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUE7O2dCQUF6QyxNQUFNLEdBQUcsU0FBZ0M7Z0JBQy9DLElBQUksQ0FBQyxN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