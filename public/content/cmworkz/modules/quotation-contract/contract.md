# Contract Module

ContractController, ContractTrait, contract models/history/terms, GenerateContract, GenerateContractLineItem, GenerateContractPDF, SendContractMails, UpdateContractStatus, and ContractReminderJob implement contracts.

Workflow: create from quotation or directly -> attach customer/property/terms/line items -> generate document -> send/verify/sign -> schedule services/invoices -> reminder/status processing -> close or renew where supported.

Contract migration status mapping is the same as quotation. Missing source quotation, invalid duration, duplicate conversion, PDF failure, and mail/queue failure are key risks.
