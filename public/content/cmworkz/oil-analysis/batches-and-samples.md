# Oil Batches & Samples

An oil batch is a grouping container. It can contain many samples; it is not a single sample and it is not a line item.

## Batch responsibilities

An `oil_batches` record carries the collection/processing context: customer, optional visit, barcode, test package, and report state. It provides the report-selection boundary.

## Sample responsibilities

An `oil_sample` is the individual physical specimen. It records:

- `oil_batch_id` — required link to its batch;
- `transformer_id` — the equipment/transformer sampled;
- optional `visit_id` — field-work traceability;
- collection and received dates;
- pressure, temperature, collector, sample point, and customer context.

## Invariants to preserve

| Invariant | Reason |
| --- | --- |
| Require a valid batch for every new sample. | A report selects samples from its batch. |
| Keep transformer and sample point accurate. | History/trend comparison uses both. |
| Do not duplicate a report for a batch without a confirmed rule. | The model/UI assumes one report per batch. |
| Do not treat previous comparison samples as new samples. | `used_oil_sample` represents reused historical data. |

## Developer test cases

- One batch with multiple transformers and samples.
- The same transformer sampled in separate batches over time.
- Multiple sample points on one transformer.
- A batch with no visit (allowed when collection is not tied to a scheduled job).
- Attempted report creation when the batch already has a report.
