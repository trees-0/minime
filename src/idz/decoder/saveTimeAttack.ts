import { RequestCode } from "./_defs";
import { RouteNo } from "../model/base";
import { CarSelector } from "../model/car";
import { SaveTimeAttackRequest } from "../request/saveTimeAttack";
import { AimeId } from "../../model";

function saveTimeAttack(buf: Buffer): SaveTimeAttackRequest {
  return {
    type: "save_time_attack_req",
    aimeId: buf.readUInt32LE(0x0004) as AimeId,
    dayNight: buf.readUInt8(0x0054) & 1,
    payload: {
      routeNo: (buf.readUInt8(0x0054) >> 1) as RouteNo,
      timestamp: new Date(buf.readUInt32LE(0x0058) * 1000),
      flags: buf.readUInt8(0x005c),
      totalTime: buf.readUInt32LE(0x0018) / 1000,
      sectionTimes: [
        buf.readUInt32LE(0x0024) / 1000,
        buf.readUInt32LE(0x0028) / 1000,
        buf.readUInt32LE(0x002c) / 1000,
      ],
      grade: buf.readUInt8(0x0062),
      carSelector: buf.readUInt16LE(0x000c) as CarSelector,
    },
    field_0002: buf.readUInt16LE(0x0002),
    field_0008: buf.readUInt32LE(0x0008),
    field_0012: buf.readUInt8(0x0012),
    field_0015: buf.readUInt8(0x0015),
    field_005D: buf.readUInt8(0x005d),
    field_005E: buf.readUInt16LE(0x005e),
    field_0060: buf.readUInt16LE(0x0060),
  };
}

// There is ... literally no difference between these messages other than their
// request code..? Even the response uses the same response code, despite
// the request codes differing.

saveTimeAttack1.msgCode = 0x00cd as RequestCode;
saveTimeAttack1.msgLen = 0x0080;

export function saveTimeAttack1(buf: Buffer): SaveTimeAttackRequest {
  return saveTimeAttack(buf);
}

saveTimeAttack2.msgCode = 0x0136 as RequestCode;
saveTimeAttack2.msgLen = 0x0080;

export function saveTimeAttack2(buf: Buffer): SaveTimeAttackRequest {
  return saveTimeAttack(buf);
}
