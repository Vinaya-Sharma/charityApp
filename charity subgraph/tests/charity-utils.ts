import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  charityCreated,
  charityFunded,
  fundsWithdrawn
} from "../generated/Charity/Charity"

export function createcharityCreatedEvent(
  name: string,
  creator: Address,
  description: string,
  fundedAmount: BigInt,
  goal: BigInt,
  funders: Array<Address>,
  id: BigInt
): charityCreated {
  let charityCreatedEvent = changetype<charityCreated>(newMockEvent())

  charityCreatedEvent.parameters = new Array()

  charityCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  charityCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  charityCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  charityCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "fundedAmount",
      ethereum.Value.fromUnsignedBigInt(fundedAmount)
    )
  )
  charityCreatedEvent.parameters.push(
    new ethereum.EventParam("goal", ethereum.Value.fromUnsignedBigInt(goal))
  )
  charityCreatedEvent.parameters.push(
    new ethereum.EventParam("funders", ethereum.Value.fromAddressArray(funders))
  )
  charityCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return charityCreatedEvent
}

export function createcharityFundedEvent(
  id: BigInt,
  owner: Address,
  funder: Address,
  fundedAmount: BigInt
): charityFunded {
  let charityFundedEvent = changetype<charityFunded>(newMockEvent())

  charityFundedEvent.parameters = new Array()

  charityFundedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  charityFundedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  charityFundedEvent.parameters.push(
    new ethereum.EventParam("funder", ethereum.Value.fromAddress(funder))
  )
  charityFundedEvent.parameters.push(
    new ethereum.EventParam(
      "fundedAmount",
      ethereum.Value.fromUnsignedBigInt(fundedAmount)
    )
  )

  return charityFundedEvent
}

export function createfundsWithdrawnEvent(
  owner: Address,
  id: BigInt
): fundsWithdrawn {
  let fundsWithdrawnEvent = changetype<fundsWithdrawn>(newMockEvent())

  fundsWithdrawnEvent.parameters = new Array()

  fundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  fundsWithdrawnEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return fundsWithdrawnEvent
}
