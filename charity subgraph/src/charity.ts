import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  charityCreated,
  charityFunded,
  fundsWithdrawn,
} from "../generated/Charity/Charity";
import { activeCharity } from "../generated/schema";
import { ByteArray } from "@graphprotocol/graph-ts";

export function handlecharityCreated(event: charityCreated): void {
  let theId = getId(event.params.id, event.params.creator);
  let selectedActiveCharity = activeCharity.load(theId);

  if (!selectedActiveCharity) {
    selectedActiveCharity = new activeCharity(theId);
  }

  selectedActiveCharity.completed = false;
  selectedActiveCharity.creator = event.params.creator;
  selectedActiveCharity.description = event.params.description;
  selectedActiveCharity.fundedAmount = event.params.fundedAmount;

  selectedActiveCharity.funders = [];

  selectedActiveCharity.name = event.params.name;
  selectedActiveCharity.idNum = event.params.id;
  selectedActiveCharity.goal = event.params.goal;
  selectedActiveCharity.id = theId;
  selectedActiveCharity.mainImage = event.params.mainImage;
  selectedActiveCharity.createdAt = event.block.timestamp;
  selectedActiveCharity.save();
}

export function handlecharityFunded(event: charityFunded): void {
  let theId = getId(event.params.id, event.params.owner);
  let selectedActiveCharity = activeCharity.load(theId);

  let fundersArray =
    selectedActiveCharity!.funders!.length > 0
      ? selectedActiveCharity!.funders
      : [];
  fundersArray!.push(event.params.funder);
  selectedActiveCharity!.funders = fundersArray;
  let num1 = selectedActiveCharity!.fundedAmount;
  let num2 = event.params.fundedAmount;
  selectedActiveCharity!.fundedAmount = num1.plus(num2);
  selectedActiveCharity!.save();
}

export function handlefundsWithdrawn(event: fundsWithdrawn): void {
  let theId = getId(event.params.id, event.params.owner);
  let selectedActiveCharity = activeCharity.load(theId);
  selectedActiveCharity!.completed = true;
  selectedActiveCharity!.save();
}

export function getId(id: BigInt, creator: Address): string {
  return id.toHexString() + creator.toHexString();
}
