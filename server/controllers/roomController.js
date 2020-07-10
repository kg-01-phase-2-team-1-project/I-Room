const { Room } = require('../models/index.js');

class RoomController {
    static async getRoomRootHandler(req, res, next) {
        try {
            const rooms = await Room.findAll();

            res.status(200).json(rooms);
        } catch (error) {
            next(error);
        }
    }

    static async postRoomAddHandler(req, res, next) {
        const objRoom = {
            name: req.body.name,
            type: req.body.type
        };

        try {
            const newRoom = await Room.create(objRoom);

            res.status(201).json({newRoom});
        } catch (error) {
            next(error);
        }
    }

    static async getRoomUpdateHandler(req, res, next) {
        const paramId = Number(req.params.id);

        try {
            const room = await Room.findByPk(paramId);

            res.status(200).json(room);
        } catch (error) {
            next(error);
        }
    }

    static async putRoomUpdateHandler(req, res, next) {
        const paramId = Number(req.params.id);

        const objRoom = {
            name: req.body.name,
            type: req.body.type
        };

        try {
            const room = await Room.update(objRoom, {
                returning: true,
                where: {
                    id: paramId
                }
            });

            console.log(room);
            

            if(room[0] === 1) {
                const result = room[1];
                const updatedData = result[0];
                res.status(200).json(updatedData);
            } else {
                next({
                    name: '404 Not Found',
                    errors: [{message: 'Not Found'}]
                });
            }

        } catch (error) {
            next(error);
        }
    }

    static async putRoomDeleteHandler(req, res, next) {
        const paramId = Number(req.params.id);

        const objRoom = {
            status: 'Unoccupied',
            UserId: null
        };

        try {
            const room = await Room.update(objRoom, {
                returning: true,
                where: {
                    id: paramId
                }
            })

            if(room[0] === 1) {
                const result = room[1];
                const updatedData = result[0];
                res.status(200).json(updatedData);
            } else {
                next({
                    name: '404 Not Found',
                    errors: [{message: 'Not Found'}]
                });
            }

        } catch (error) {
            next(error);
        }
    }

    // static async getRoomBookingHandler(req, res, next) {
    //     try {
    //         const rooms = await Room.findAll({
    //             where: {
    //                 status: 'Unoccupied',
    //                 UserId: null
    //             }
    //         });

    //         res.status(200).json(rooms);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    static async putRoomBookingHandler(req, res, next) {
        const paramId = Number(req.params.id);

        const objRoom = {
            status: 'Occupied',
            UserId: req.userLogin.id
        };

        try {
            const room = await Room.update(objRoom, {
                returning: true,
                where: {
                    id: paramId
                }
            })

            if(room[0] === 1) {
                const result = room[1];
                const updatedData = result[0];
                res.status(200).json(updatedData);
            } else {
                next({
                    name: '404 Not Found',
                    errors: [{message: 'Not Found'}]
                });
            }

        } catch (error) {
            next(error);
        }
    }
}

module.exports = RoomController;