"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger = void 0;
const swagger_1 = require("@nestjs/swagger");
function swagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Hexabot')
        .setDescription('Hexabot API documentation')
        .setVersion('2.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
}
exports.swagger = swagger;
//# sourceMappingURL=swagger.js.map