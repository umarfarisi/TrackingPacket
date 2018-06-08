/**
 * Track the shipment of a packet
 * @param {mintips.kelompok05.miti.Ship} ship - the ship to be processed
 * @transaction
 */
async function shipPacket(ship) {

    ship.packet.status = ship.newStatus;
    ship.packet.checkpoint = ship.newCheckpoint;
    
    let assetRegistry = await getAssetRegistry('mintips.kelompok05.miti.Packet');
    await assetRegistry.update(ship.packet);
}