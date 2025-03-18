package vn.project.DoctorCare.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.project.DoctorCare.domain.Statistic;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResUserDTO;
import vn.project.DoctorCare.domain.response.ResultPaginationDTO;
import vn.project.DoctorCare.repository.StatisticRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StatisticService {
    private final StatisticRepository statisticRepository;

    public StatisticService(StatisticRepository statisticRepository) {
        this.statisticRepository = statisticRepository;
    }

    public ResultPaginationDTO fetchALlStatisticList(Specification<Statistic> spec, Pageable pageable) {
        Page<Statistic> pageStatistic = this.statisticRepository.findAll(spec, pageable);

        List<Statistic> listStatistic = pageStatistic.getContent();

        ResultPaginationDTO resultPaginationDTO = new ResultPaginationDTO();
        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();

        meta.setPage(pageable.getPageNumber());
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(pageStatistic.getTotalPages());
        meta.setTotal(pageStatistic.getTotalElements());

        resultPaginationDTO.setMeta(meta);

        resultPaginationDTO.setResult(listStatistic);
        return resultPaginationDTO;
    }

    public Statistic fetchStatisticById(Long id) {
        Optional<Statistic> statistic = this.statisticRepository.findById(id);
        if(statistic.isPresent()) {
            return statistic.get();
        }
        return null;
    }

    public Statistic handleAddStatistic(Statistic statistic) {
        return this.statisticRepository.save(statistic);
    }

    public Statistic fetchStatisticByDate(String date) {
        Optional<Statistic> statistic = this.statisticRepository.findByDate(date);
        if(statistic.isPresent()) {
            return statistic.get();
        }
        return null;
    }



    public Statistic handleUpdateStatistic(Statistic reqStatistic) {
        Statistic statistic = this.fetchStatisticById(reqStatistic.getId());
        if(statistic != null) {
             statistic.setCompletedBookings(reqStatistic.getCompletedBookings());
             statistic.setCancelledBookings(reqStatistic.getCancelledBookings());
             statistic.setTotalBookings(reqStatistic.getTotalBookings());
             statistic.setRevenue(reqStatistic.getRevenue());
             statistic.setCreatedAt(reqStatistic.getCreatedAt());
             statistic.setDate(reqStatistic.getDate());
             statistic.setCreatedBy(reqStatistic.getCreatedBy());
             statistic.setUpdatedAt(reqStatistic.getUpdatedAt());
             statistic.setUpdatedBy(reqStatistic.getUpdatedBy());

             this.handleUpdateStatistic(statistic);
            return this.statisticRepository.save(statistic);
        }
        return this.statisticRepository.save(statistic);
    }
}
