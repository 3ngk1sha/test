"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationCommand = void 0;
const nest_commander_1 = require("nest-commander");
const logger_service_1 = require("../logger/logger.service");
const migration_service_1 = require("./migration.service");
const types_1 = require("./types");
let MigrationCommand = class MigrationCommand extends nest_commander_1.CommandRunner {
    constructor(logger, migrationService) {
        super();
        this.logger = logger;
        this.migrationService = migrationService;
    }
    async run(passedParam) {
        const [subcommand] = passedParam;
        switch (subcommand) {
            case 'create': {
                const [, version] = passedParam;
                if (!this.migrationService.isValidVersion(version)) {
                    throw new TypeError('Invalid version value.');
                }
                return this.migrationService.create(version);
            }
            case 'migrate': {
                const [, action, version] = passedParam;
                if (!Object.values(types_1.MigrationAction).includes(action)) {
                    this.logger.error('Invalid Operation');
                    this.exit();
                }
                if (typeof version === 'undefined' ||
                    this.migrationService.isValidVersion(version)) {
                    return await this.migrationService.run({
                        action: action,
                        version,
                    });
                }
                else {
                    throw new TypeError('Invalid version value.');
                }
            }
            default:
                this.logger.error('No valid command provided');
                this.exit();
                break;
        }
    }
    exit() {
        this.logger.log('Exiting migration process.');
        process.exit(0);
    }
};
exports.MigrationCommand = MigrationCommand;
exports.MigrationCommand = MigrationCommand = __decorate([
    (0, nest_commander_1.Command)({
        name: 'migration',
        description: 'Manage Mongodb Migrations',
    }),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        migration_service_1.MigrationService])
], MigrationCommand);
//# sourceMappingURL=migration.command.js.map