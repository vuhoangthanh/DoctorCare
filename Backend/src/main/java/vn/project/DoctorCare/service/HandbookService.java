package vn.project.DoctorCare.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.project.DoctorCare.domain.HandBook;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResultPaginationDTO;
import vn.project.DoctorCare.domain.response.handbook.ResHandBookDTO;
import vn.project.DoctorCare.repository.HandbookRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HandbookService {

    private final HandbookRepository handbookRepository;

    public HandbookService(HandbookRepository handbookRepository) {
        this.handbookRepository = handbookRepository;
    }

    public ResultPaginationDTO fetchAllHandbooks(Specification<HandBook> spec, Pageable pageable) {


        Page<HandBook> pageHandBook = this.handbookRepository.findAll(spec, pageable);

        List<HandBook> listHandBook = pageHandBook.getContent();

        ResultPaginationDTO resultPaginationDTO = new ResultPaginationDTO();
        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();

        meta.setPage(pageable.getPageNumber());
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(pageHandBook.getTotalPages());
        meta.setTotal(pageHandBook.getTotalElements());

        resultPaginationDTO.setMeta(meta);

        List<ResHandBookDTO> listResHandBookDTOS = new ArrayList<ResHandBookDTO>();
        for (HandBook handBook : listHandBook) {
            ResHandBookDTO resHandBookDTO = new ResHandBookDTO();
            ResHandBookDTO.ResSpecialtyDTO resSpecialtyDTO = new ResHandBookDTO.ResSpecialtyDTO(handBook.getSpecialtyData().getName(), handBook.getSpecialtyData().getId());

            resHandBookDTO.setId(handBook.getId());
            resHandBookDTO.setTitle(handBook.getTitle());
            resHandBookDTO.setThumbnail(handBook.getThumbnail());
            resHandBookDTO.setContentHtml(handBook.getContentHtml());
            resHandBookDTO.setContentMarkdown(handBook.getContentMarkdown());
            resHandBookDTO.setCreatedAt(handBook.getCreatedAt());
            resHandBookDTO.setCreatedBy(handBook.getCreatedBy());
            resHandBookDTO.setSpecialtyData(resSpecialtyDTO);

            listResHandBookDTOS.add(resHandBookDTO);
        }

        resultPaginationDTO.setResult(listResHandBookDTOS);

        return resultPaginationDTO;
    }

    public HandBook fetchBookingById(Long id) {
        Optional<HandBook> handBook = this.handbookRepository.findById(id);
        if(handBook.isPresent()) {
            return handBook.get();
        }
        return null;
    }

    public HandBook handleAddBooking(HandBook handBook) {
        return this.handbookRepository.save(handBook);
    }

    public HandBook handleUpdateBooking(HandBook reqHandBook) {
        HandBook handBook = this.fetchBookingById(reqHandBook.getId());
        if(handBook != null) {
            handBook.setContentHtml(reqHandBook.getContentHtml());
            handBook.setTitle(reqHandBook.getTitle());
            handBook.setThumbnail(reqHandBook.getThumbnail());
            handBook.setContentMarkdown(reqHandBook.getContentMarkdown());
            handBook.setSpecialtyId(reqHandBook.getSpecialtyId());

            return this.handbookRepository.save(handBook);
        }
        return handBook;
    }

    public void handleDeleteBooking(Long id) {
        this.handbookRepository.deleteById(id);
    }
}
