import { SubstrateBlock, SubstrateEvent, SubstrateExtrinsic } from "@subql/types";
import { ContributionSummary } from "../types";

const MULTISIG_ADDR = [
  "13wNbioJt44NKrcQ5ZUrshJqP7TKzQbzZt5nhkeL4joa3PAX",
  "12of6J5x9TyCo1qFn96ZFBqKTZd3Su6Ugy6qZbfRfyv3ktSU",
];

// const MULTISIG_ADDR = ["14auZo7SiRJUjnWoQdQJkQEFdy6KRF7xnyWRj91mxhPZKN4F"];

export const handleCrowdloanContribute = async ({ event, idx }: SubstrateEvent) => {
  const [who, fund, amount] = event.data.toArray();

  let record = await ContributionSummary.get(fund.toString());
  if (record && record.account === who.toString()) {
    record.amount = (BigInt(record.amount) + BigInt(amount.toString())).toString();
  } else {
    record = ContributionSummary.create({
      id: idx.toString(),
      paraId: fund.toString(),
      account: who.toString(),
      amount: amount.toString(),
    });
  }
  await record.save();
};
