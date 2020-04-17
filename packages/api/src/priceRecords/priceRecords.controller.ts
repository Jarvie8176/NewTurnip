import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AddPriceRecords, UpdatePriceRecords } from "@turnip-market/dtos";
import { User } from "../auth/auth.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ValidatedUser } from "../users/users.interface";
import { AddPriceRecordsDto } from "./dtos/addPriceRecords.dto";
import { GetPriceRecordsDto } from "./dtos/getPriceRecords.dto";
import { PriceRecordsService } from "./priceRecords.service";

@Controller()
@ApiBearerAuth()
@ApiTags("PriceRecords")
export class PriceRecordsController {
  constructor(private readonly priceRecordsService: PriceRecordsService) {}

  @Get()
  async getPriceRecords(): Promise<GetPriceRecordsDto> {
    const priceRecords = await this.priceRecordsService.getAllRecords();
    return { data: { priceRecords } };
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getCurrentUserPriceRecords(@User() user: ValidatedUser.Type): Promise<GetPriceRecordsDto> {
    const priceRecords = await this.priceRecordsService.getRecordsByUser(user);
    return { data: { priceRecords } };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "adds a price record and link to current user" })
  async addPriceRecord(
    @User() user: ValidatedUser.Type,
    @Body() input: AddPriceRecords.Request.Type
  ): Promise<AddPriceRecordsDto> {
    const priceRecord = await this.priceRecordsService.addRecord({ payload: input, user });
    return { data: { priceRecord } };
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "updates an existing price record" })
  async updatePriceRecord(
    @User() user: ValidatedUser.Type,
    @Param("id") priceRecordId: string,
    @Body() input: UpdatePriceRecords.Request.Type
  ): Promise<AddPriceRecordsDto> {
    const priceRecord = await this.priceRecordsService.updateRecord({ priceRecordId, payload: input, user });
    return { data: { priceRecord } };
  }
}
