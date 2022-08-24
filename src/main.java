import java.io.*;
import java.util.*;
import java.lang.*;
import java.math.*;

public class main {
    private static int N; //number of players
    private static double elimTime=2; //num seconds person has to move before eliminated
    //move idenification numbers: 1 left, 2 right, 3 upskip, 4 downskip, 5 repeat, 6 undo, negatives are palmed version of a move
    private static int nextPos; //position that should make the next move
    private static boolean direction; //true if ccw, false if cw
    private static boolean palmed; //true if last move was palmed, false if it wasn't
    private static int lastMove; //identification number of last move
    private static int lastPos;

    public static void setN(int a){
        N=a;
    }

    public static void move(int p, int s){ //a move was made in position p, move identification number s
        if(p!=nextPos){
            eliminate(p);
            return;
        }

        if(Math.abs(s)==1){
            nextPos=(nextPos+1)%N;
            direction=false;
        }
        lastMove=s;
        lastPos=p;
    }
    
    public static void start(){ //make sure first player cannot start with 3,4,5,6
        nextPos=(int)Math.ceil(N*Math.random());
        lastMove=0;
        lastPos=0;
    }

    private static void eliminate(int p){ //position p eliminated
        N = N-1;
        System.out.println("Position "+p+" was eliminated.");
    }

    public static void main(String[] args) throws IOException {

    }
}
