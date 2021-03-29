import { BigInt, Address, store } from '@graphprotocol/graph-ts';
import { Transfer } from '../generated/StakeToken/StakeToken';
import { Holder } from '../generated/schema';

function updateBalance(tokenAddress: Address, holderAddress: Address, value: BigInt, increase: boolean): void {
  if (holderAddress.toHexString() == '0x0000000000000000000000000000000000000000') return;
  let id = tokenAddress.toHex() + '-' + holderAddress.toHex();
  let holder = Holder.load(id);
  if (holder == null) {
    holder = new Holder(id);
    holder.address = holderAddress;
    holder.balance = BigInt.fromI32(0);
  }
  holder.balance = increase ? holder.balance.plus(value) : holder.balance.minus(value);
  if (holder.balance.isZero()) {
    store.remove('Holder', id);
  } else {
    holder.save();
  }
}

export function handleTransfer(event: Transfer): void {
  updateBalance(event.address, event.params.from, event.params.value, false);
  updateBalance(event.address, event.params.to, event.params.value, true);
}
