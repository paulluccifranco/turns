package com.back.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name="DELETED_TURN", uniqueConstraints =
        {  @UniqueConstraint(name = "DeletedTurn", columnNames = { "DAY", "PERMANENT_TURN_ID"})})
public class DeletedTurn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "DAY")
    @Temporal(TemporalType.DATE)
    private Date day;
    @Column(name = "PERMANENT_TURN_ID")
    private Long permanentTurnId;

    public DeletedTurn(Date day, Long permanentTurnId) {
        this.day = day;
        this.permanentTurnId = permanentTurnId;
    }
}
