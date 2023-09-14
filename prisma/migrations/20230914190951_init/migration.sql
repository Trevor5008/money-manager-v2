-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `openingBalance` DECIMAL(65, 30) NOT NULL,
    `balance` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `year` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `month` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `month` INTEGER NOT NULL,
    `yearId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `date` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` INTEGER NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `monthId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `income` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(65, 30) NOT NULL,
    `accountId` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `isRecurring` BOOLEAN NOT NULL,
    `dateId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(65, 30) NOT NULL,
    `accountId` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `isRecurring` BOOLEAN NOT NULL,
    `dateId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transfer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(65, 30) NOT NULL,
    `accountFromId` INTEGER NOT NULL,
    `accountToId` INTEGER NOT NULL,
    `isRecurring` BOOLEAN NOT NULL,
    `dateId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `debtPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(65, 30) NOT NULL,
    `accountFromId` INTEGER NOT NULL,
    `accountToId` INTEGER NOT NULL,
    `isRecurring` BOOLEAN NOT NULL,
    `dateId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `month` ADD CONSTRAINT `month_yearId_fkey` FOREIGN KEY (`yearId`) REFERENCES `year`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `date` ADD CONSTRAINT `date_monthId_fkey` FOREIGN KEY (`monthId`) REFERENCES `month`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income` ADD CONSTRAINT `income_dateId_fkey` FOREIGN KEY (`dateId`) REFERENCES `date`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income` ADD CONSTRAINT `income_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_dateId_fkey` FOREIGN KEY (`dateId`) REFERENCES `date`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transfer` ADD CONSTRAINT `transfer_dateId_fkey` FOREIGN KEY (`dateId`) REFERENCES `date`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transfer` ADD CONSTRAINT `transfer_accountFromId_fkey` FOREIGN KEY (`accountFromId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transfer` ADD CONSTRAINT `transfer_accountToId_fkey` FOREIGN KEY (`accountToId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `debtPayment` ADD CONSTRAINT `debtPayment_dateId_fkey` FOREIGN KEY (`dateId`) REFERENCES `date`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `debtPayment` ADD CONSTRAINT `debtPayment_accountFromId_fkey` FOREIGN KEY (`accountFromId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `debtPayment` ADD CONSTRAINT `debtPayment_accountToId_fkey` FOREIGN KEY (`accountToId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
