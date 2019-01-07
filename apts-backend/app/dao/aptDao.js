/* Load Apt entity */
const Apt = require('../model/apt');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Apt Data Access Object
 */
class AptDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT * FROM apt WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Apt(row.id, row.address, row.floor, row.rooms, row.sqrMtr, row.parking, row.storage, row.arnona, row.vaad, row.price, row.imgUrl));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM apt";
        return this.common.findAll(sqlRequest).then(rows => {
            let apts = [];
            for (const row of rows) {
                apts.push(new Apt(row.id, row.address, row.floor, row.rooms, row.sqrMtr, row.parking, row.storage, row.arnona, row.vaad, row.price, row.imgUrl));
            }
            return apts;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM apt";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Apt
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Apt) {
        let sqlRequest = "UPDATE apt SET " +
            "address=$address, " +
            "floor=$floor, " +
            "rooms=$rooms, " +
            "sqrMtr=$sqrMtr " +
            "parking=$parking " +
            "storage=$storage " +
            "arnona=$arnona " +
            "vaad=$vaad " +
            "price=$price " +
            "imgUrl=$imgUrl " +
            "WHERE id=$id";

        let sqlParams = {
            $address: Apt.address,
            $floor: Apt.floor,
            $rooms: Apt.rooms,
            $sqrMtr: Apt.sqrMtr,
            $parking: Apt.parking,
            $storage: Apt.storage,
            $arnona: Apt.arnona,
            $vaad: Apt.vaad,
            $price: Apt.price,
            $imgUrl: Apt.imgUrl,
            $id: Apt.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Apt
     * returns database insertion status
     */
    create(Apt) {
        let sqlRequest = "INSERT into apt (address, floor, rooms, sqrMtr, parking, storage, arnona, vaad, price, imgUrl) " +
            "VALUES ($address, $floor, $rooms, $sqrMtr, $parking, $storage, $arnona, $vaad, $price, $imgUrl)";
        let sqlParams = {
            $address: Apt.address,
            $floor: Apt.floor,
            $rooms: Apt.rooms,
            $sqrMtr: Apt.sqrMtr,
            $parking: Apt.parking,
            $storage: Apt.storage,
            $arnona: Apt.arnona,
            $vaad: Apt.vaad,
            $price: Apt.price,
            $imgUrl: Apt.imgUrl,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Apt
     * returns database insertion status
     */
    createWithId(Apt) {
        let sqlRequest = "INSERT into apt (id, address, floor, rooms, sqrMtr, parking, storage, arnona, vaad, price, imgUrl) " +
            "VALUES ($id, ($address, $floor, $rooms, $sqrMtr, $parking, $storage, $arnona, $vaad, $price, $imgUrl)";
        let sqlParams = {
            $id: Apt.id,
            $address: Apt.address,
            $floor: Apt.floor,
            $rooms: Apt.rooms,
            $sqrMtr: Apt.sqrMtr,
            $parking: Apt.parking,
            $storage: Apt.storage,
            $arnona: Apt.arnona,
            $vaad: Apt.vaad,
            $price: Apt.price,
            $imgUrl: Apt.imgUrl
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM apt WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM apt WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = AptDao;