-- CreateTable
CREATE TABLE `Cliente` (
    `cliente_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `telefono` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `tipo_documento` ENUM('DUI', 'NIT', 'PASAPORTE', 'CARNET_RESIDENTE', 'OTRO') NOT NULL,
    `numero_documento` VARCHAR(20) NOT NULL,
    `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `stripeCustomerId` VARCHAR(255) NULL,
    `direccion_id` INTEGER NULL,

    UNIQUE INDEX `Cliente_email_key`(`email`),
    UNIQUE INDEX `Cliente_numero_documento_key`(`numero_documento`),
    PRIMARY KEY (`cliente_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleado` (
    `empleado_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `telefono` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `fecha_contratacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` ENUM('ACTIVO', 'INACTIVO', 'TERMINADO') NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `direccion_id` INTEGER NULL,

    UNIQUE INDEX `Empleado_email_key`(`email`),
    PRIMARY KEY (`empleado_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Material` (
    `material_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `tipo` VARCHAR(30) NOT NULL,
    `unidad_medida` VARCHAR(10) NOT NULL,
    `stock_actual` DECIMAL(10, 2) NOT NULL,
    `stock_minimo` DECIMAL(10, 2) NOT NULL,
    `proveedor_principal_id` INTEGER NULL,

    PRIMARY KEY (`material_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proveedor` (
    `proveedor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `telefono` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `productos_principales` TEXT NULL,
    `direccion_id` INTEGER NULL,

    UNIQUE INDEX `Proveedor_email_key`(`email`),
    UNIQUE INDEX `Proveedor_direccion_id_key`(`direccion_id`),
    PRIMARY KEY (`proveedor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdenCompra` (
    `orden_compra_id` INTEGER NOT NULL AUTO_INCREMENT,
    `proveedor_id` INTEGER NOT NULL,
    `fecha_orden` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_esperada` DATETIME(3) NOT NULL,
    `estado` ENUM('PENDIENTE', 'PROCESANDO_PAGO', 'PAGADA', 'ENVIADA', 'RECIBIDA_PARCIAL', 'RECIBIDA_COMPLETA', 'CANCELADA') NOT NULL,

    PRIMARY KEY (`orden_compra_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleOrden` (
    `detalle_id` INTEGER NOT NULL AUTO_INCREMENT,
    `orden_compra_id` INTEGER NOT NULL,
    `material_id` INTEGER NOT NULL,
    `cantidad` DECIMAL(10, 2) NOT NULL,
    `precio_unitario` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`detalle_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FacturaPago` (
    `factura_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_id` INTEGER NOT NULL,
    `fecha_emision` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_vencimiento` DATETIME(3) NOT NULL,
    `total` DECIMAL(12, 2) NOT NULL,
    `estado` ENUM('PENDIENTE', 'PAGADA', 'VENCIDA', 'ANULADA') NOT NULL,
    `metodo_pago` ENUM('EFECTIVO', 'TARJETA_CREDITO', 'TARJETA_DEBITO', 'TRANSFERENCIA', 'CHEQUE', 'OTRO', 'STRIPE') NOT NULL,
    `stripePaymentIntentId` VARCHAR(255) NULL,
    `stripeChargeId` VARCHAR(255) NULL,

    UNIQUE INDEX `FacturaPago_stripePaymentIntentId_key`(`stripePaymentIntentId`),
    UNIQUE INDEX `FacturaPago_stripeChargeId_key`(`stripeChargeId`),
    PRIMARY KEY (`factura_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direccion` (
    `id_direccion` INTEGER NOT NULL AUTO_INCREMENT,
    `departamento` VARCHAR(50) NOT NULL,
    `municipio` VARCHAR(50) NOT NULL,
    `distrito` VARCHAR(50) NULL,
    `calle` VARCHAR(100) NOT NULL,
    `colonia` VARCHAR(100) NULL,
    `casa` VARCHAR(20) NULL,
    `punto_referencia` VARCHAR(200) NULL,

    PRIMARY KEY (`id_direccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Envio` (
    `id_envio` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` ENUM('PREPARANDO', 'LISTO_PARA_ENVIAR', 'EN_RUTA', 'ENTREGADO', 'FALLIDO', 'DEVUELTO') NOT NULL,
    `direccion_id` INTEGER NOT NULL,
    `orden_compra_id` INTEGER NULL,

    UNIQUE INDEX `Envio_direccion_id_key`(`direccion_id`),
    PRIMARY KEY (`id_envio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuthToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NULL,
    `clienteId` INTEGER NULL,
    `empleadoId` INTEGER NULL,

    UNIQUE INDEX `AuthToken_token_key`(`token`),
    INDEX `AuthToken_clienteId_idx`(`clienteId`),
    INDEX `AuthToken_empleadoId_idx`(`empleadoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DetalleOrdenToFacturaPago` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DetalleOrdenToFacturaPago_AB_unique`(`A`, `B`),
    INDEX `_DetalleOrdenToFacturaPago_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_direccion_id_fkey` FOREIGN KEY (`direccion_id`) REFERENCES `Direccion`(`id_direccion`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleado` ADD CONSTRAINT `Empleado_direccion_id_fkey` FOREIGN KEY (`direccion_id`) REFERENCES `Direccion`(`id_direccion`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Material` ADD CONSTRAINT `Material_proveedor_principal_id_fkey` FOREIGN KEY (`proveedor_principal_id`) REFERENCES `Proveedor`(`proveedor_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proveedor` ADD CONSTRAINT `Proveedor_direccion_id_fkey` FOREIGN KEY (`direccion_id`) REFERENCES `Direccion`(`id_direccion`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenCompra` ADD CONSTRAINT `OrdenCompra_proveedor_id_fkey` FOREIGN KEY (`proveedor_id`) REFERENCES `Proveedor`(`proveedor_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleOrden` ADD CONSTRAINT `DetalleOrden_orden_compra_id_fkey` FOREIGN KEY (`orden_compra_id`) REFERENCES `OrdenCompra`(`orden_compra_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleOrden` ADD CONSTRAINT `DetalleOrden_material_id_fkey` FOREIGN KEY (`material_id`) REFERENCES `Material`(`material_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FacturaPago` ADD CONSTRAINT `FacturaPago_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`cliente_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Envio` ADD CONSTRAINT `Envio_direccion_id_fkey` FOREIGN KEY (`direccion_id`) REFERENCES `Direccion`(`id_direccion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Envio` ADD CONSTRAINT `Envio_orden_compra_id_fkey` FOREIGN KEY (`orden_compra_id`) REFERENCES `OrdenCompra`(`orden_compra_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthToken` ADD CONSTRAINT `AuthToken_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`cliente_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthToken` ADD CONSTRAINT `AuthToken_empleadoId_fkey` FOREIGN KEY (`empleadoId`) REFERENCES `Empleado`(`empleado_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DetalleOrdenToFacturaPago` ADD CONSTRAINT `_DetalleOrdenToFacturaPago_A_fkey` FOREIGN KEY (`A`) REFERENCES `DetalleOrden`(`detalle_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DetalleOrdenToFacturaPago` ADD CONSTRAINT `_DetalleOrdenToFacturaPago_B_fkey` FOREIGN KEY (`B`) REFERENCES `FacturaPago`(`factura_id`) ON DELETE CASCADE ON UPDATE CASCADE;
