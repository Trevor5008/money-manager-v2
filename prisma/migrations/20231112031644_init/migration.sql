-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `accountCategoryId` INTEGER NOT NULL,
    `openingBalance` DECIMAL(9, 2) NOT NULL,
    `balance` DECIMAL(9, 2) NOT NULL,

    INDEX `account_accountCategoryId_fkey`(`accountCategoryId`),
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

    INDEX `month_yearId_fkey`(`yearId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `date` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` INTEGER NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `monthId` INTEGER NOT NULL,

    INDEX `date_monthId_fkey`(`monthId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `income` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(9, 2) NOT NULL,
    `accountId` INTEGER NOT NULL,
    `subCategoryId` INTEGER NOT NULL,
    `isRecurring` BOOLEAN NOT NULL,
    `dateId` INTEGER NOT NULL,

    INDEX `income_accountId_fkey`(`accountId`),
    INDEX `income_dateId_fkey`(`dateId`),
    INDEX `income_subCategoryId_fkey`(`subCategoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expense` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(9, 2) NOT NULL,
    `accountId` INTEGER NOT NULL,
    `subCategoryId` INTEGER NOT NULL,
    `isRecurring` BOOLEAN NOT NULL,
    `dateId` INTEGER NOT NULL,

    INDEX `expense_accountId_fkey`(`accountId`),
    INDEX `expense_dateId_fkey`(`dateId`),
    INDEX `expense_subCategoryId_fkey`(`subCategoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transfer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(9, 2) NOT NULL,
    `accountFromId` INTEGER NOT NULL,
    `accountToId` INTEGER NOT NULL,
    `isRecurring` BOOLEAN NOT NULL,
    `dateId` INTEGER NOT NULL,

    INDEX `transfer_accountFromId_fkey`(`accountFromId`),
    INDEX `transfer_accountToId_fkey`(`accountToId`),
    INDEX `transfer_dateId_fkey`(`dateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accountcategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `debtpayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(9, 2) NOT NULL,
    `accountFromId` INTEGER NOT NULL,
    `accountToId` INTEGER NOT NULL,
    `isRecurring` BOOLEAN NOT NULL,
    `dateId` INTEGER NOT NULL,

    INDEX `debtPayment_accountFromId_fkey`(`accountFromId`),
    INDEX `debtPayment_accountToId_fkey`(`accountToId`),
    INDEX `debtPayment_dateId_fkey`(`dateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subcategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,

    INDEX `subCategory_categoryId_fkey`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_accountCategoryId_fkey` FOREIGN KEY (`accountCategoryId`) REFERENCES `accountcategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `month` ADD CONSTRAINT `month_yearId_fkey` FOREIGN KEY (`yearId`) REFERENCES `year`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `date` ADD CONSTRAINT `date_monthId_fkey` FOREIGN KEY (`monthId`) REFERENCES `month`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income` ADD CONSTRAINT `income_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income` ADD CONSTRAINT `income_dateId_fkey` FOREIGN KEY (`dateId`) REFERENCES `date`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income` ADD CONSTRAINT `income_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `subcategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_dateId_fkey` FOREIGN KEY (`dateId`) REFERENCES `date`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expense` ADD CONSTRAINT `expense_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `subcategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transfer` ADD CONSTRAINT `transfer_accountFromId_fkey` FOREIGN KEY (`accountFromId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transfer` ADD CONSTRAINT `transfer_accountToId_fkey` FOREIGN KEY (`accountToId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transfer` ADD CONSTRAINT `transfer_dateId_fkey` FOREIGN KEY (`dateId`) REFERENCES `date`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `debtpayment` ADD CONSTRAINT `debtPayment_accountFromId_fkey` FOREIGN KEY (`accountFromId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `debtpayment` ADD CONSTRAINT `debtPayment_accountToId_fkey` FOREIGN KEY (`accountToId`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `debtpayment` ADD CONSTRAINT `debtPayment_dateId_fkey` FOREIGN KEY (`dateId`) REFERENCES `date`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subcategory` ADD CONSTRAINT `subCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
