import { BigInt } from "@graphprotocol/graph-ts"
import {
  Birth,
  Transfer
} from "../generated/CryptoKitties/CryptoKitties"
import { Kitty, Ownier } from "../generated/schema"

// Handles Birth event and creates a new Kitty entity
export function handleBirth(event: Birth): void {
  let kitty = new Kitty(event.params.kittyId.toString())
  kitty.kittyId = event.params.kittyId
  kitty.generation = event.params.generation
  kitty.genes = event.params.genes
  kitty.birthTime = event.block.timestamp
  
  // Metadata can be calculated from genes or other sources
  kitty.metadata = calculateMetadata(event.params.genes)

  let owner = Owner.load(event.params.owner.toHex())
  if (owner == null) {
    owner = new Owner(event.params.owner.toHex())
    owner.address = event.params.owner
  }
  kitty.owner = owner.id
  owner.save()
  kitty.save()
}

// Handles Transfer event and updates the owner of the Kitty
export function handleTransfer(event: Transfer): void {
  let kitty = Kitty.load(event.params.tokenId.toString())
  if (kitty == null) {
    return
  }

  let newOwner = Owner.load(event.params.to.toHex())
  if (newOwner == null) {
    newOwner = new Owner(event.params.to.toHex())
    newOwner.address = event.params.to
  }

  kitty.owner = newOwner.id
  newOwner.save()
  kitty.save()
}

// Example of calculating metadata from genes
function calculateMetadata(genes: BigInt): string {
  // Placeholder function to convert genes into metadata (like colors, traits, etc.)
  return "Metadata for genes: " + genes.toString()
}
