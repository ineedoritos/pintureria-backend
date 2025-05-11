-- CreateTable
CREATE TABLE `Bitacora` (
    `idReg` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioSistema` VARCHAR(191) NOT NULL,
    `fechaHoraSistema` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nombreTabla` VARCHAR(191) NOT NULL,
    `transaccion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idReg`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
