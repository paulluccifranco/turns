package com.back.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.UniqueConstraint;
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
