-- CreateTable
CREATE TABLE `ControlEjecucion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_script` VARCHAR(191) NOT NULL,
    `ejecutado` BOOLEAN NOT NULL DEFAULT false,
    `fecha_ejecucion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ControlEjecucion_nombre_script_key`(`nombre_script`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
