# Customer Contacts, Properties, and Addresses

Contact and property screens are child workflows of the customer module. They use CustomerController methods updateOrCreatePerson, updateOrCreateDetails, patchContactPerson, patchPropertyAddress, patchBillingAddress, getPersons, getDetails, getPerson, and getDetail.

The parent customer must exist before child records are saved. Contact notification flags are used by quotation, contract, invoice, visit, and mail workflows. Property/billing addresses are referenced by transactions and service visits. Check customer persons/details models, AddressController, address migrations, and frontend components before changing fields.
