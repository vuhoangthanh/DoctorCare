package vn.project.DoctorCare.controller;

import com.turkraft.springfilter.boot.Filter;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.project.DoctorCare.domain.HandBook;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResultPaginationDTO;
import vn.project.DoctorCare.service.HandbookService;
import vn.project.DoctorCare.util.annotation.ApiMessage;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class HandBookController {
    private final HandbookService handbookService;

    public HandBookController(HandbookService handbookService) {
        this.handbookService = handbookService;
    }

    @GetMapping("/handbooks")
    @ApiMessage("fetch all handbook")
    public ResponseEntity<ResultPaginationDTO> getAllHandbook(@Filter Specification<HandBook> spec,
                                                                    Pageable pageable
    ) {
        ResultPaginationDTO resultPaginationDTO = this.handbookService.fetchAllHandbooks(spec, pageable);

        return ResponseEntity.ok(resultPaginationDTO);
    }

    @PostMapping("/handbooks")
    @ApiMessage("add handbook")
    public ResponseEntity<HandBook> addHandbook(@RequestBody  HandBook reqhandbook) {

        HandBook handBook = this.handbookService.handleAddBooking(reqhandbook);
        return ResponseEntity.status(HttpStatus.CREATED).body(handBook);
    }

    @PutMapping("/handbooks")
    @ApiMessage("update handbook")
    public ResponseEntity<HandBook> updateHandbook(@RequestBody  HandBook reqhandbook) {
        HandBook handBook = this.handbookService.handleUpdateBooking(reqhandbook);
        return ResponseEntity.ok(handBook);
    }

    @DeleteMapping("handbooks")
    @ApiMessage("delete handbook")
    public ResponseEntity<Void> deleteHandbook(@RequestParam("id")  long id) {

        this.handbookService.handleDeleteBooking(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @GetMapping("/handbook-by-id")
    @ApiMessage("fetch handbook by id")
    public ResponseEntity<HandBook> getHandbookById(@RequestParam("id") long id){

        HandBook handBook =  this.handbookService.fetchHandBookById(id);
        return ResponseEntity.ok(handBook);
    }
    @GetMapping("/handbook-by-specialty")
    @ApiMessage("fetch handbook by id")
    public ResponseEntity<List<HandBook>> getHandbookBySpecialtyId(@RequestParam("id") long id){

        List<HandBook> handBooks =  this.handbookService.fetchHandBookBySpecialtyId(id);
        return ResponseEntity.ok(handBooks);
    }
}
