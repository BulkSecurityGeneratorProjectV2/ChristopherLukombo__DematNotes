package org.csid.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.csid.service.EvaluationService;
import org.csid.web.rest.errors.BadRequestAlertException;
import org.csid.web.rest.util.HeaderUtil;
import org.csid.service.dto.EvaluationDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Evaluation.
 */
@RestController
@RequestMapping("/api")
public class EvaluationResource {

    private final Logger log = LoggerFactory.getLogger(EvaluationResource.class);

    private static final String ENTITY_NAME = "evaluation";

    private final EvaluationService evaluationService;

    public EvaluationResource(EvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    /**
     * POST  /evaluations : Create a new evaluation.
     *
     * @param evaluationDTO the evaluationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new evaluationDTO, or with status 400 (Bad Request) if the evaluation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/evaluations")
    @Timed
    public ResponseEntity<EvaluationDTO> createEvaluation(@Valid @RequestBody EvaluationDTO evaluationDTO) throws URISyntaxException {
        log.debug("REST request to save Evaluation : {}", evaluationDTO);
        if (evaluationDTO.getId() != null) {
            throw new BadRequestAlertException("A new evaluation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EvaluationDTO result = evaluationService.save(evaluationDTO);
        return ResponseEntity.created(new URI("/api/evaluations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /evaluations : Updates an existing evaluation.
     *
     * @param evaluationDTO the evaluationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated evaluationDTO,
     * or with status 400 (Bad Request) if the evaluationDTO is not valid,
     * or with status 500 (Internal Server Error) if the evaluationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/evaluations")
    @Timed
    public ResponseEntity<EvaluationDTO> updateEvaluation(@Valid @RequestBody EvaluationDTO evaluationDTO) throws URISyntaxException {
        log.debug("REST request to update Evaluation : {}", evaluationDTO);
        if (evaluationDTO.getId() == null) {
            return createEvaluation(evaluationDTO);
        }
        EvaluationDTO result = evaluationService.save(evaluationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, evaluationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /evaluations : get all the evaluations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of evaluations in body
     */
    @GetMapping("/evaluations")
    @Timed
    public List<EvaluationDTO> getAllEvaluations() {
        log.debug("REST request to get all Evaluations");
        return evaluationService.findAll();
        }

    /**
     * GET  /evaluations/:id : get the "id" evaluation.
     *
     * @param id the id of the evaluationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the evaluationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/evaluations/{id}")
    @Timed
    public ResponseEntity<EvaluationDTO> getEvaluation(@PathVariable Long id) {
        log.debug("REST request to get Evaluation : {}", id);
        EvaluationDTO evaluationDTO = evaluationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(evaluationDTO));
    }

    /**
     * DELETE  /evaluations/:id : delete the "id" evaluation.
     *
     * @param id the id of the evaluationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/evaluations/{id}")
    @Timed
    public ResponseEntity<Void> deleteEvaluation(@PathVariable Long id) {
        log.debug("REST request to delete Evaluation : {}", id);
        evaluationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
