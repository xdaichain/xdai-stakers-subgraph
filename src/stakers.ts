import { BigInt, Address } from '@graphprotocol/graph-ts';
import {
  PlacedStake,
  WithdrewStake,
  MovedStake,
  ClaimedOrderedWithdrawal,
} from '../generated/StakingAuRa/StakingAuRa';
import {
  PlacedStake as PlacedStakeV2,
  WithdrewStake as WithdrewStakeV2,
  MovedStake as MovedStakeV2,
  ClaimedOrderedWithdrawal as ClaimedOrderedWithdrawalV2,
} from '../generated/StakingAuRaV2/StakingAuRaV2';
import { Staker } from '../generated/schema';

function handleDeposit(stakerAddress: Address, amount: BigInt): void {
  let id = stakerAddress.toHex();
  let staker = Staker.load(id);
  if (staker == null) {
    staker = new Staker(id);
    staker.address = stakerAddress;
    staker.balance = BigInt.fromI32(0);
  }
  staker.balance = staker.balance.plus(amount);
  staker.save();
}

function handleWithdraw(stakerAddress: Address, amount: BigInt): void {
  let id = stakerAddress.toHex();
  let staker = Staker.load(id);
  staker.balance = staker.balance.minus(amount);
  staker.save();
}

export function handlePlacedStake(event: PlacedStake): void {
  handleDeposit(event.params.staker, event.params.amount);
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

export function handlePlacedStakeV2(event: PlacedStakeV2): void {
  handleDeposit(event.params.staker, event.params.amount);
}

export function handleWithdrewStakeV2(event: WithdrewStakeV2): void {
  handleWithdraw(event.params.staker, event.params.amount);
}

export function handleMovedStakeV2(event: MovedStakeV2): void {
  handleWithdraw(event.params.staker, event.params.amount);
}

export function handleClaimedOrderedWithdrawalV2(event: ClaimedOrderedWithdrawalV2): void {
  handleWithdraw(event.params.staker, event.params.amount);
}
