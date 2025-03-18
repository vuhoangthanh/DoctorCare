package vn.project.DoctorCare.controller;

import com.turkraft.springfilter.boot.Filter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.project.DoctorCare.domain.Statistic;
import vn.project.DoctorCare.domain.response.ResultPaginationDTO;
import vn.project.DoctorCare.service.StatisticService;
import vn.project.DoctorCare.util.annotation.ApiMessage;

@RestController
@RequestMapping("/api/v1")
public class StatisticController {

    private final StatisticService statisticService;
    public StatisticController(StatisticService statisticService) {
        this.statisticService = statisticService;
    }

    @GetMapping("/statistics")
    @ApiMessage("fetch statictis")
    public ResponseEntity<ResultPaginationDTO> fetchStatictis(
                                        @Filter Specification<Statistic> spec,
                                        Pageable pageable
    ) {
        ResultPaginationDTO resultPaginationDTO = this.statisticService.fetchALlStatisticList(spec, pageable);
        return ResponseEntity.ok(resultPaginationDTO);
    }
}
