import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '../users/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';

@Controller('reports')
export class ReportsController {
	constructor(private readonly reportsService: ReportsService) {}

	@Post()
	@UseGuards(AuthGuard)
	@Serialize(ReportDto)
	async createReport(@Body() request: CreateReportDto, @CurrentUser() user: User) {
		return await this.reportsService.create(request, user);
	}

	@Patch('/:id')
	@UseGuards(AuthGuard)
	async approveReport(@Param('id') id: string, @Body() request: ApproveReportDto) {
		return await this.reportsService.changeApproval(parseInt(id), request.approved);
	}
}
