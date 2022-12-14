// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class charityCreated extends ethereum.Event {
  get params(): charityCreated__Params {
    return new charityCreated__Params(this);
  }
}

export class charityCreated__Params {
  _event: charityCreated;

  constructor(event: charityCreated) {
    this._event = event;
  }

  get name(): string {
    return this._event.parameters[0].value.toString();
  }

  get creator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get description(): string {
    return this._event.parameters[2].value.toString();
  }

  get fundedAmount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get goal(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get funders(): Array<Address> {
    return this._event.parameters[5].value.toAddressArray();
  }

  get mainImage(): string {
    return this._event.parameters[6].value.toString();
  }

  get id(): BigInt {
    return this._event.parameters[7].value.toBigInt();
  }
}

export class charityFunded extends ethereum.Event {
  get params(): charityFunded__Params {
    return new charityFunded__Params(this);
  }
}

export class charityFunded__Params {
  _event: charityFunded;

  constructor(event: charityFunded) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get funder(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get fundedAmount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class fundsWithdrawn extends ethereum.Event {
  get params(): fundsWithdrawn__Params {
    return new fundsWithdrawn__Params(this);
  }
}

export class fundsWithdrawn__Params {
  _event: fundsWithdrawn;

  constructor(event: fundsWithdrawn) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Charity__getCharitiesResultValue0Struct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get owner(): Address {
    return this[1].toAddress();
  }

  get description(): string {
    return this[2].toString();
  }

  get fundedAmount(): BigInt {
    return this[3].toBigInt();
  }

  get goal(): BigInt {
    return this[4].toBigInt();
  }

  get funders(): Array<Address> {
    return this[5].toAddressArray();
  }

  get id(): BigInt {
    return this[6].toBigInt();
  }
}

export class Charity__getCompletedCharitiesResultValue0Struct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get owner(): Address {
    return this[1].toAddress();
  }

  get description(): string {
    return this[2].toString();
  }

  get fundedAmount(): BigInt {
    return this[3].toBigInt();
  }

  get goal(): BigInt {
    return this[4].toBigInt();
  }

  get funders(): Array<Address> {
    return this[5].toAddressArray();
  }

  get id(): BigInt {
    return this[6].toBigInt();
  }
}

export class Charity extends ethereum.SmartContract {
  static bind(address: Address): Charity {
    return new Charity("Charity", address);
  }

  createCharity(
    _name: string,
    _description: string,
    _goal: BigInt,
    _image: string
  ): BigInt {
    let result = super.call(
      "createCharity",
      "createCharity(string,string,uint256,string):(uint256)",
      [
        ethereum.Value.fromString(_name),
        ethereum.Value.fromString(_description),
        ethereum.Value.fromUnsignedBigInt(_goal),
        ethereum.Value.fromString(_image)
      ]
    );

    return result[0].toBigInt();
  }

  try_createCharity(
    _name: string,
    _description: string,
    _goal: BigInt,
    _image: string
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "createCharity",
      "createCharity(string,string,uint256,string):(uint256)",
      [
        ethereum.Value.fromString(_name),
        ethereum.Value.fromString(_description),
        ethereum.Value.fromUnsignedBigInt(_goal),
        ethereum.Value.fromString(_image)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getCharities(
    _owner: Address,
    _id: BigInt
  ): Charity__getCharitiesResultValue0Struct {
    let result = super.call(
      "getCharities",
      "getCharities(address,uint256):((string,address,string,uint256,uint256,address[],uint256))",
      [
        ethereum.Value.fromAddress(_owner),
        ethereum.Value.fromUnsignedBigInt(_id)
      ]
    );

    return changetype<Charity__getCharitiesResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getCharities(
    _owner: Address,
    _id: BigInt
  ): ethereum.CallResult<Charity__getCharitiesResultValue0Struct> {
    let result = super.tryCall(
      "getCharities",
      "getCharities(address,uint256):((string,address,string,uint256,uint256,address[],uint256))",
      [
        ethereum.Value.fromAddress(_owner),
        ethereum.Value.fromUnsignedBigInt(_id)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Charity__getCharitiesResultValue0Struct>(value[0].toTuple())
    );
  }

  getCompletedCharities(
    _owner: Address,
    _id: BigInt
  ): Charity__getCompletedCharitiesResultValue0Struct {
    let result = super.call(
      "getCompletedCharities",
      "getCompletedCharities(address,uint256):((string,address,string,uint256,uint256,address[],uint256))",
      [
        ethereum.Value.fromAddress(_owner),
        ethereum.Value.fromUnsignedBigInt(_id)
      ]
    );

    return changetype<Charity__getCompletedCharitiesResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getCompletedCharities(
    _owner: Address,
    _id: BigInt
  ): ethereum.CallResult<Charity__getCompletedCharitiesResultValue0Struct> {
    let result = super.tryCall(
      "getCompletedCharities",
      "getCompletedCharities(address,uint256):((string,address,string,uint256,uint256,address[],uint256))",
      [
        ethereum.Value.fromAddress(_owner),
        ethereum.Value.fromUnsignedBigInt(_id)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Charity__getCompletedCharitiesResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getCurrentId(): BigInt {
    let result = super.call("getCurrentId", "getCurrentId():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getCurrentId(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getCurrentId", "getCurrentId():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateCharityCall extends ethereum.Call {
  get inputs(): CreateCharityCall__Inputs {
    return new CreateCharityCall__Inputs(this);
  }

  get outputs(): CreateCharityCall__Outputs {
    return new CreateCharityCall__Outputs(this);
  }
}

export class CreateCharityCall__Inputs {
  _call: CreateCharityCall;

  constructor(call: CreateCharityCall) {
    this._call = call;
  }

  get _name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _description(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _goal(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _image(): string {
    return this._call.inputValues[3].value.toString();
  }
}

export class CreateCharityCall__Outputs {
  _call: CreateCharityCall;

  constructor(call: CreateCharityCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class FundCharityCall extends ethereum.Call {
  get inputs(): FundCharityCall__Inputs {
    return new FundCharityCall__Inputs(this);
  }

  get outputs(): FundCharityCall__Outputs {
    return new FundCharityCall__Outputs(this);
  }
}

export class FundCharityCall__Inputs {
  _call: FundCharityCall;

  constructor(call: FundCharityCall) {
    this._call = call;
  }

  get _owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _id(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class FundCharityCall__Outputs {
  _call: FundCharityCall;

  constructor(call: FundCharityCall) {
    this._call = call;
  }
}

export class WithdrawFundsCall extends ethereum.Call {
  get inputs(): WithdrawFundsCall__Inputs {
    return new WithdrawFundsCall__Inputs(this);
  }

  get outputs(): WithdrawFundsCall__Outputs {
    return new WithdrawFundsCall__Outputs(this);
  }
}

export class WithdrawFundsCall__Inputs {
  _call: WithdrawFundsCall;

  constructor(call: WithdrawFundsCall) {
    this._call = call;
  }

  get _owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _id(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawFundsCall__Outputs {
  _call: WithdrawFundsCall;

  constructor(call: WithdrawFundsCall) {
    this._call = call;
  }
}
