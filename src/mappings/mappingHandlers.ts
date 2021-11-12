import { SubstrateBlock, SubstrateEvent, SubstrateExtrinsic } from "@subql/types";
import { ContributionSummary } from "../types";

const MULTISIG_ADDR = "13wNbioJt44NKrcQ5ZUrshJqP7TKzQbzZt5nhkeL4joa3PAX";
// const MULTISIG_ADDR = "14auZo7SiRJUjnWoQdQJkQEFdy6KRF7xnyWRj91mxhPZKN4F";

export const handleCrowdloanContribute = async ({ event, idx }: SubstrateEvent) => {
  const [who, fund, amount] = event.data.toArray();
  if (MULTISIG_ADDR !== who.toString()) {
    return;
  }
  let record = await ContributionSummary.get(fund.toString());
  if (record) {
    record.amount = (BigInt(record.amount) + BigInt(amount.toString())).toString();
  } else {
    record = ContributionSummary.create({
      id: fund.toString(),
      amount: amount.toString(),
    });
  }
  await record.save();
};
