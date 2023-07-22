import { GlobalError } from "../constants/global_errors";
import Path from "../models/Path";
import Day from "../models/day.model";
import Payment from "../models/payment.model";
import Truck from "../models/truck.model";
import User from "../models/user";
import Zones from "../models/zones.model";

interface RouteDay {
    id: number;
    name: string;
    lat: number;
    lng: number;
    status: boolean;
}

async function getDays({limit, page}: any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const offset = page === 1 ? 0 : Math.floor((limit * page) - limit);
    const {count, rows} = await Day.findAndCountAll({
        limit,
        offset,
        order: [['id', 'DESC']],
        include: [
            {
                model: Path,
                attributes: ['name', 'id']
            },
            {
                model: User,
                attributes: ['name', 'lastName', 'email', 'dni']
            },
            {
                model: Truck,
                attributes: ['color', 'model', 'serial', 'lts', 'status']
            },
            {
                model: User,
                as: 'client',
                attributes: ['name', 'lastName', 'email', 'dni', 'device', 'phone']
            },
        ]
    });
    return {total: count, rows, limit, page};
    // return {limit, offset, page}
}

async function createDay(data:any, type: string) {
    const path = await Path.findByPk(data.idpath);
    const clients = await path?.getUsers();
    if (!clients) return GlobalError.DATA_ALREADY_EXIST
    const drive = await User.findByPk(data.iddrive);
    if(!drive) return GlobalError.NOT_FOUND_DATA
    const client = await User.findByPk(data.iduser, {
        attributes: {
          exclude: ['password']
        }
      });
    if(!client) return GlobalError.NOT_FOUND_DATA
    const truck = await Truck.findByPk(data.idtruck);
    if(!truck) return GlobalError.NOT_FOUND_DATA
    const day = await Day.create({
        ...data, 
        status: 'charging',
    })
    
    const payment = await Payment.create({idday: day.id, iduser: day.iduser, status: 'wait'});
    console.log( {...day.toJSON(), payment: payment.toJSON(), client: client.toJSON()} )
    
    return  {...day.toJSON(), payment: payment.toJSON(), client: client.toJSON()};
}

async function updateDayStatus(id:number, status: "wait" | "charging" | "dispatching" | "end", type: string) {
    const day = await Day.findByPk(id);
    if(!day) return GlobalError.NOT_FOUND_DATA;
    day.update({status});
    return day.toJSON();
}

async function updateDayRoute(id:number, data: any, type: string) {
    const day = await Day.findByPk(id);
    if(!day) return GlobalError.NOT_FOUND_DATA;
    const routes: RouteDay[] = JSON.parse(day.routes);
    // console.log(typeof day.routes)
    
    day.update({routes: JSON.stringify(routes.map(e => e.id === data.id ? {...e, status: data.status} : e))})
    // day.update({status});
    return day.toJSON();
}

async function finallyDay(type: string, dateEnd: any,  id: number) {
    if(type === 'customer') return GlobalError.NOT_PERMITED_ACCESS;
    const day = await Day.findByPk(id);
    if(!day) return GlobalError.NOT_FOUND_DATA;
    day.update({status: 'end', dateEnd});
    return day.toJSON();
}

async function getDayOfDriver({type, id}: any) {
    if(type === 'customer') return GlobalError.NOT_PERMITED_ACCESS;
    const day = await Day.findOne({where: {iddrive: id}, order: [['id', "DESC"]],         include: [
        {
            model: Path,
            attributes: ['name', 'id']
        },
        {
            model: Truck,
            attributes: ['color', 'model', 'serial', 'lts', 'status']
        }
    ]});
    if(!day) return GlobalError.NOT_FOUND_DATA;
    return day.toJSON();
}


export {
    createDay,
    finallyDay,
    getDayOfDriver,
    updateDayStatus,
    updateDayRoute,
    getDays
}