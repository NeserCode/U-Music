import { MittEvent } from "@shared/mitt"
import mitt from "mitt"

export const $bus = mitt<MittEvent>()
