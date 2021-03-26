import { BigInt, Address } from '@graphprotocol/graph-ts';
import { PlacedStake, WithdrewStake, MovedStake, ClaimedOrderedWithdrawal } from '../generated/StakingAuRa/StakingAuRa';
import { Staker } from '../generated/schema';

export function handlePlacedStake(event: PlacedStake): void {
  let id = event.params.staker.toHex();
  let staker = Staker.load(id);
  if (staker == null) {
    staker = new Staker(id);
    staker.address = event.params.staker;
    staker.balance = BigInt.fromI32(0);
  }
  staker.balance = staker.balance.plus(event.params.amount);
  staker.save();
}

function handleWithdraw(stakerAddress: Address, amount: BigInt): void {
  let id = stakerAddress.toHex();
  let staker = Staker.load(id);
  staker.balance = staker.balance.minus(amount);
  staker.save();
}

export function handleWithdrewStake(event: WithdrewStake): void {
  handleWithdraw(event.params.staker, event.params.amount);
}

export function handleMovedStake(event: MovedStake): void {
  handleWithdraw(event.params.staker, event.params.amount);
}

export function handleClaimedOrderedWithdrawal(event: ClaimedOrderedWithdrawal): void {
  handleWithdraw(event.params.staker, event.params.amount);
}
