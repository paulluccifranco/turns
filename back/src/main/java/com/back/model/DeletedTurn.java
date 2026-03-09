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
@Table(name="deleted_turn", uniqueConstraints =
        {  @UniqueConstraint(name = "DeletedTurn", columnNames = { "day", "permanent_turn_id"})})
public class DeletedTurn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    // "day" es palabra reservada en H2
    @Column(name = "\"day\"")
    @Temporal(TemporalType.DATE)
    private Date day;
    @Column(name = "permanent_turn_id")
    private Long permanentTurnId;

    public DeletedTurn(Date day, Long permanentTurnId) {
        this.day = day;
        this.permanentTurnId = permanentTurnId;
    }
}
