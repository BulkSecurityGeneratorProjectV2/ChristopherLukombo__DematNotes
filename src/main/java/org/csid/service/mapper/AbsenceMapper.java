package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.AbsenceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Absence and its DTO AbsenceDTO.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class})
public interface AbsenceMapper extends EntityMapper<AbsenceDTO, Absence> {

    @Mapping(source = "student.id", target = "studentId")
    AbsenceDTO toDto(Absence absence);

    @Mapping(source = "studentId", target = "student")
    Absence toEntity(AbsenceDTO absenceDTO);

    default Absence fromId(Long id) {
        if (id == null) {
            return null;
        }
        Absence absence = new Absence();
        absence.setId(id);
        return absence;
    }
}
