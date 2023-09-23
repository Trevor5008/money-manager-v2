/*

    [
        2023: {
            0 (January): {
                1: {
                    day: string, // Thursday
                    items: {
                        income: [
                            category: string,
                            account: string,
                            amount: decimal
                            isRecurring: boolean,
                        ],
                        expenses: [],
                        transfers: [],
                        debtPayments: []
                    }
                }
            }
        }
    ]

    // Accounts
    [
        Type: string,
        Name: string,
        OpeningBalance: decimal,
        Balance: decimal
    ]



      dateObj = {
         date: integer,
         day: string,
         month: integer idx,
         year: integer,
         items: {
            income: [
               occurrenceObj,
               occurrenceObj
            ],
            expenses: [
               occurrenceObj,
               occurrenceObj
            ],
            transfers: [],
            debtPayments: []
         }
      }

      transferOccurrenceObj = {
         date: obj,
         isRecurring: boolean,
         accountFrom: integer idx,
         accountTo: integer idx,
         amount: decimal
      }

      occurrenceObj = {
         date: date obj,
         isRecurring: boolean,
         account: integer idx,
         amount: decimal,
         category: string
      }
*/
