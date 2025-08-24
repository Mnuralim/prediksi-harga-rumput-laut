/*
  Warnings:

  - You are about to drop the column `koefisien_biaya_produksi` on the `koefisien_regresi` table. All the data in the column will be lost.
  - You are about to drop the column `koefisien_cuaca` on the `koefisien_regresi` table. All the data in the column will be lost.
  - You are about to drop the column `mape` on the `koefisien_regresi` table. All the data in the column will be lost.
  - You are about to drop the `cuaca` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hasil_panen` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `koefisien_jumlah_produksi` to the `koefisien_regresi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `koefisien_kualitas` to the `koefisien_regresi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `koefisien_permintaan` to the `koefisien_regresi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `hasil_panen` DROP FOREIGN KEY `hasil_panen_id_cuaca_fkey`;

-- AlterTable
ALTER TABLE `koefisien_regresi` DROP COLUMN `koefisien_biaya_produksi`,
    DROP COLUMN `koefisien_cuaca`,
    DROP COLUMN `mape`,
    ADD COLUMN `koefisien_jumlah_produksi` DOUBLE NOT NULL,
    ADD COLUMN `koefisien_kualitas` DOUBLE NOT NULL,
    ADD COLUMN `koefisien_permintaan` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `cuaca`;

-- DropTable
DROP TABLE `hasil_panen`;

-- CreateTable
CREATE TABLE `harga_rumput_laut` (
    `id` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `jumlah_produksi` INTEGER NOT NULL,
    `kualitas` TINYINT NOT NULL,
    `permintaan` INTEGER NOT NULL,
    `harga` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `harga_rumput_laut_id_key`(`id`),
    UNIQUE INDEX `harga_rumput_laut_tanggal_key`(`tanggal`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
