package vn.project.DoctorCare.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.project.DoctorCare.domain.Markdown;
import vn.project.DoctorCare.domain.User;
import vn.project.DoctorCare.domain.response.ResDoctorDTO;
import vn.project.DoctorCare.domain.response.ResDoctorDetailDTO;
import vn.project.DoctorCare.domain.response.ResTopDoctorsDTO;
import vn.project.DoctorCare.service.DoctorService;
import vn.project.DoctorCare.service.MarkdownService;
import vn.project.DoctorCare.util.annotation.ApiMessage;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1")
public class DoctorController {

    private final DoctorService doctorService;
    private final MarkdownService markdownService;

    public DoctorController(DoctorService doctorService, MarkdownService markdownService) {
        this.doctorService = doctorService;
        this.markdownService = markdownService;
    }

    @GetMapping("/top-doctors")
    @ApiMessage("get top doctors")
    public ResponseEntity<List<ResTopDoctorsDTO>> getTopDoctors(
            @RequestParam(value = "limit", defaultValue = "6") int limit) {

        List<ResTopDoctorsDTO> doctors = this.doctorService.fetchTopDoctors(limit);
        return ResponseEntity.status(HttpStatus.OK).body(doctors);
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<ResDoctorDTO>> getAllDoctors() {

        List<ResDoctorDTO> doctors = this.doctorService.fetchAllDoctors();
        return ResponseEntity.status(HttpStatus.OK).body(doctors);
    }

    @PostMapping("/doctors-infor")
    @ApiMessage("add doctor information")
    public ResponseEntity<Markdown> addDoctorInfo(@RequestBody Markdown reqMarkdown) {

        Markdown markdown = this.markdownService.handleAddMarkdown(reqMarkdown);
        return ResponseEntity.status(HttpStatus.CREATED).body(markdown);
    }

    @PutMapping("/doctors-infor")
    @ApiMessage("update doctor information")
    public ResponseEntity<Markdown> editDoctorInfo(@RequestBody Markdown reqMarkdown) {

        Markdown markdown = this.markdownService.handleUpdateMarkdown(reqMarkdown);
        return ResponseEntity.status(HttpStatus.OK).body(markdown);
    }

    @GetMapping("/doctors-detail/{id}")
    @ApiMessage("fetch doctor detail by id")
    public ResponseEntity<ResDoctorDetailDTO> getDetailDoctorById(@PathVariable("id") long id) {

        ResDoctorDetailDTO user = this.doctorService.fetchDetailDoctorById(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

}
